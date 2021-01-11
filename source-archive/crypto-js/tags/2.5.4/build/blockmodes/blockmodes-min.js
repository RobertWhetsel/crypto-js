/*
 * Crypto-JS v2.5.4
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(function(h){function k(c,a){var b=c._blocksize*4;return b-a.length%b}var j=h.pad={},l=function(c,a,b,d){var e=a.pop();if(e==0)throw Error("Invalid zero-length padding specified for "+b+". Wrong cipher specification or key used?");if(e>c._blocksize*4)throw Error("Invalid padding length of "+e+" specified for "+b+". Wrong cipher specification or key used?");for(c=1;c<e;c++){var g=a.pop();if(d!=void 0&&d!=g)throw Error("Invalid padding byte of 0x"+g.toString(16)+" specified for "+b+". Wrong cipher specification or key used?");
}};j.NoPadding={pad:function(){},unpad:function(){}};j.ZeroPadding={pad:function(c,a){var b=c._blocksize*4,d=a.length%b;if(d!=0)for(d=b-d;d>0;d--)a.push(0)},unpad:function(c,a){for(;a[a.length-1]==0;)a.pop()}};j.iso7816={pad:function(c,a){var b=k(c,a);for(a.push(128);b>1;b--)a.push(0)},unpad:function(c,a){var b;for(b=c._blocksize*4;b>0;b--){var d=a.pop();if(d==128)return;if(d!=0)throw Error("ISO-7816 padding byte must be 0, not 0x"+d.toString(16)+". Wrong cipher specification or key used?");}throw Error("ISO-7816 padded beyond cipher block size. Wrong cipher specification or key used?");
}};j.ansix923={pad:function(c,a){for(var b=k(c,a),d=1;d<b;d++)a.push(0);a.push(b)},unpad:function(c,a){l(c,a,"ANSI X.923",0)}};j.iso10126={pad:function(c,a){for(var b=k(c,a),d=1;d<b;d++)a.push(Math.floor(Math.random()*256));a.push(b)},unpad:function(c,a){l(c,a,"ISO 10126",void 0)}};j.pkcs7={pad:function(c,a){for(var b=k(c,a),d=0;d<b;d++)a.push(b)},unpad:function(c,a){l(c,a,"PKCS 7",a[a.length-1])}};var h=h.mode={},i=h.Mode=function(c){if(c)this._padding=c};i.prototype={encrypt:function(c,a,b){this._padding.pad(c,
a);this._doEncrypt(c,a,b)},decrypt:function(c,a,b){this._doDecrypt(c,a,b);this._padding.unpad(c,a)},_padding:j.iso7816};var f=(h.ECB=function(){i.apply(this,arguments)}).prototype=new i;f._doEncrypt=function(c,a){for(var b=c._blocksize*4,d=0;d<a.length;d+=b)c._encryptblock(a,d)};f._doDecrypt=function(c,a){for(var b=c._blocksize*4,d=0;d<a.length;d+=b)c._decryptblock(a,d)};f.fixOptions=function(c){c.iv=[]};f=(h.CBC=function(){i.apply(this,arguments)}).prototype=new i;f._doEncrypt=function(c,a,b){for(var d=
c._blocksize*4,e=0;e<a.length;e+=d){if(e==0)for(var g=0;g<d;g++)a[g]^=b[g];else for(g=0;g<d;g++)a[e+g]^=a[e+g-d];c._encryptblock(a,e)}};f._doDecrypt=function(c,a,b){for(var d=c._blocksize*4,e=0;e<a.length;e+=d){var g=a.slice(e,e+d);c._decryptblock(a,e);for(var f=0;f<d;f++)a[e+f]^=b[f];b=g}};f=(h.CFB=function(){i.apply(this,arguments)}).prototype=new i;f._padding=j.NoPadding;f._doEncrypt=function(c,a,b){for(var d=c._blocksize*4,b=b.slice(0),e=0;e<a.length;e++){var g=e%d;g==0&&c._encryptblock(b,0);
a[e]^=b[g];b[g]=a[e]}};f._doDecrypt=function(c,a,b){for(var d=c._blocksize*4,b=b.slice(0),e=0;e<a.length;e++){var g=e%d;g==0&&c._encryptblock(b,0);var f=a[e];a[e]^=b[g];b[g]=f}};f=(h.OFB=function(){i.apply(this,arguments)}).prototype=new i;f._padding=j.NoPadding;f._doEncrypt=function(c,a,b){for(var d=c._blocksize*4,b=b.slice(0),e=0;e<a.length;e++)e%d==0&&c._encryptblock(b,0),a[e]^=b[e%d]};f._doDecrypt=f._doEncrypt;h=(h.CTR=function(){i.apply(this,arguments)}).prototype=new i;h._padding=j.NoPadding;
h._doEncrypt=function(c,a,b){for(var d=c._blocksize*4,b=b.slice(0),e=0;e<a.length;){var g=b.slice(0);c._encryptblock(g,0);for(var f=0;e<a.length&&f<d;f++,e++)a[e]^=g[f];++b[d-1]==256&&(b[d-1]=0,++b[d-2]==256&&(b[d-2]=0,++b[d-3]==256&&(b[d-3]=0,++b[d-4])))}};h._doDecrypt=h._doEncrypt})(Crypto);
