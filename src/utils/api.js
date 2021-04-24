import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

const VERSION = 'x25519-xsalsa20-poly1305';

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweets(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}

export function saveTweet (info) {
  return _saveTweet(info)
}

export function getPk(ethAddress){

}

export function encryptMessage(msg, pk){
  const sendKeyPair = createSenderKeyPair();
  const msgBox = encryptSafely(
            pk,
            sendKeyPair,
            {data:msg},
           VERSION
          );
  const encryptedMessage = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          msgBox
        ),
        'utf8'
      )
    );
  //decrypt the data using receiverPk and our secretKey 
  var data = nacl.box.open(naclUtil.decodeBase64(msgBox.ciphertext), naclUtil.decodeBase64(msgBox.nonce),
   naclUtil.decodeBase64(pk), sendKeyPair.secretKey);
  debugger;
  //decryptSendMessage(encryptedMessage,sendKeyPair);
  return encryptedMessage;
}

export function createSenderKeyPair(){
   const ephemeralKeyPair = nacl.box.keyPair();
   return ephemeralKeyPair; 
}

//TODO storeSenderKeyPair();

export function decryptSendMessage(encryptedData, sendKeyPair){
 console.log("local.decrypt:",sigUtil.decrypt(encryptedData, sendKeyPair.secretKey));
}

//https://github.com/MetaMask/eth-sig-util/blob/3764b9e7364e54eed762ba0a86338669d54c9dc5/src/index.ts#L454
//we need the sendKey so we can decrypt our sent box
function encryptSafely(
  receiverPublicKey,
  sendKeyPair,
  msgParams,
  version
){
  const DEFAULT_PADDING_LENGTH = 2 ** 11;
  const NACL_EXTRA_BYTES = 16;

  const { data } = msgParams;
  if (!data) {
    throw new Error('Cannot encrypt empty msg.data');
  }

  if (typeof data === 'object' && 'toJSON' in data) {
    // remove toJSON attack vector
    // TODO, check all possible children
    throw new Error(
      'Cannot encrypt with toJSON property.  Please remove toJSON property'
    );
  }

  // add padding
  const dataWithPadding = {
    data,
    padding: '',
  };

  // calculate padding
  const dataLength = Buffer.byteLength(
    JSON.stringify(dataWithPadding),
    'utf-8'
  );
  const modVal = dataLength % DEFAULT_PADDING_LENGTH;
  let padLength = 0;
  // Only pad if necessary
  if (modVal > 0) {
    padLength = DEFAULT_PADDING_LENGTH - modVal - NACL_EXTRA_BYTES; // nacl extra bytes
  }
  dataWithPadding.padding = '0'.repeat(padLength);

  const paddedMsgParams = { data: JSON.stringify(dataWithPadding) };
  return encrypt(receiverPublicKey, sendKeyPair, paddedMsgParams, version);
}

function encrypt(
  receiverPublicKey,
  senderKeyPair,
  msgParams,
  version
) {
  switch (version) {
    case 'x25519-xsalsa20-poly1305': {
      if (typeof msgParams.data !== 'string') {
        throw new Error(
          'Cannot detect secret message, message params should be of the form {data: "secret message"} '
        );
      }
      // generate ephemeral keypair
      //const ephemeralKeyPair = nacl.box.keyPair();

      // assemble encryption parameters - from string to UInt8
      let pubKeyUInt8Array;
      try {
        pubKeyUInt8Array = naclUtil.decodeBase64(receiverPublicKey);
      } catch (err) {
        throw new Error('Bad public key');
      }

      const msgParamsUInt8Array = naclUtil.decodeUTF8(msgParams.data);
      const nonce = nacl.randomBytes(nacl.box.nonceLength);

      // encrypt
      const encryptedMessage = nacl.box(
        msgParamsUInt8Array,
        nonce,
        pubKeyUInt8Array,
        senderKeyPair.secretKey
      );

      // handle encrypted data
      const output = {
        version: 'x25519-xsalsa20-poly1305',
        nonce: naclUtil.encodeBase64(nonce),
        ephemPublicKey: naclUtil.encodeBase64(senderKeyPair.publicKey),
        ciphertext: naclUtil.encodeBase64(encryptedMessage),
      };
      // return encrypted msg data
      return output;
    }

    default:
      throw new Error('Encryption type/version not supported');
  }
}