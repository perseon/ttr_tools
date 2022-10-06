// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Register = factory(root.KaitaiStream);
    }
  }(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
  var Register = (function() {
    function Register(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Register.prototype._read = function() {
      this.pduType = this._io.readU1();
      this.passNum = this._io.readU4be();
      this.issi = this._io.readBitsIntBe(24);
      this._io.alignToByte();
      this.regType = this._io.readU1();
    }
  
    return Register;
  })();
  return Register;
  }));
  