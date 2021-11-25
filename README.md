native-msg-box
==============

Allows you to display a native MessageBox / Dialog.

By native we mean an OS level, not a browser level dialog.

### Installing
Have Git installed, just for safety!
Run `npm install` or `yarn add` or whatever you use and type this as the package name `git+https://github.com/mooocow123/native-msg-box` or if you want original module *insert package manager install command here* `native-msg-box`.
If it doesn't work with yarn 2 or 3, use `native-msg-box@git+https://github.com/mooocow123/native-msg-box` as the package name instead if you're trying to install this.

Example:
--------

    var msgbox = require('native-msg-box');
    msgbox.prompt({
      msg: "Hunt the Wumpus?",
      title: "Game"
    }, function(err, result) {
      switch (result) {
        case msgbox.Result.YES:
          console.log("pressed yes");
          break;
        case msgbox.Result.NO:
          console.log("pressed no");
          break;
      }
    });


API:

*   prompt(options, callback)

    **options**

    `msg` {string} REQUIRED The message to display, Example: `msg: "Hello World!"`

    `title` {string} optional. Title for dialog (not available on all OSes ... yet?), Example: `title: "Hello World The Hello World :)"`
    
    `icon` {number} optional. Icon for dialog, Example: `icon: msgbox.Icon.STOP`
    
    `type` {number} optional. Type of dialog, Example: `type: 2`
    
    Full options example:
    `
    {
        msg: "Hello World!",
        title: "Hello World The Hello World :)",
        icon: msgbox.Icon.STOP,
        type: 2
    }
    `

    **callback**

    The callback gets passed an `err` and a `result`. At the moment `err` should always
    be `null`. `result` is one of

        Result.YES
        Result.NO

    Why not just a simple `true` or `false`? Because the future possibility of
    more values like `Cancel`, `Retry`, etc..

Prerequisites
-------------

Currently the Linux version requires `wmctrl` and `zentiy`.

To Do
-----

*   Add more dialog types. For example

    *    a single string prompt `"Enter Name: ____"`
    *    other buttons like "Ok", "Cancel"



