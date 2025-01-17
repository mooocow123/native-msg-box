/*
 * Copyright 2021, Gregg Tavares. (Hey, this my fork of it!) and mooocow123
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares or mooocow123. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

var execFile = require('child_process').execFile;
var constants = require('../../constants');
var path = require('path');

var escapeString = function(msg) {
  return msg;
};

var buttonTypes = {
  "1": ["Ok", "Cancel"],
  "2": ["Abort", "Retry", "Ignore"],
  "3": ["Yes", "No", "Cancel"],
  "4": ["Yes", "No"],
  "5": ["Retry", "Cancel"],
  "6": ["Cancel", "Try Again", "Continue"],
};

// native icons
// 0: stop
// 1: note ??
// 2: caution

// Matches windows :(
var buttonResults = {
  ok: constants.Result.OK,
  cancel: constants.Result.CANCEL,
  abort: constants.Result.ABORT,
  retry: constants.Result.RETRY,
  ignore: constants.Result.IGNORE,
  yes: constants.Result.YES,
  no: constants.Result.NO,
  "try again": constants.Result.TRYAGAIN,
  "continue": constants.Result.CONTINUE,
};

//  1: OK
//  2: Cancel button
//  3: Abort button
//  4: Retry button
//  5: Ignore button
//  6: Yes button
//  7: No button
// 10: Try Again button
// 11: Continue button

var prompt = function(options, callback) {
  var msg = escapeString(options.msg);
  var args = [msg];

  if (options.title) {
    args.unshift(options.title);
  } else {
    args.push("");
  }

  options.type = options.type || 4;
  var buttons = [];
  if (options.type) {
    var buttonList = buttonTypes[options.type];
    if (buttonList) {
      var buttons = buttonList.forEach(function(value) {
        args.push(escapeString(value));
      });
    }
  }

  var osxalertPath = path.join(__dirname, "bin", "osxalert");
  execFile(osxalertPath, args, function(err, stdout, stderr) {
    var result;
    if (!err) {
      var data = stdout.toString().trim();
      var buttonPressed = parseInt(data);
      var button = buttonList[buttonPressed - 1].toLowerCase();
      result = buttonResults[button];
    }
    if (!result) {
      result = 7; // No
      err = false;
    }
    callback(err, result);
  });
};

exports.prompt = prompt;

