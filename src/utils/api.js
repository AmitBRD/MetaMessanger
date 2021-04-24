import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';

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
  const encryptedMessage = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encryptSafely(
            pk,
            {data:msg},
           VERSION
          )
        ),
        'utf8'
      )
    );
  return encryptedMessage;
}