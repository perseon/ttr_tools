// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Lip = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var Lip = (function() {
  function Lip(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Lip.prototype._read = function() {
    this.adaptation = this._io.readU2be();
    this.cmPdu = this._io.readU1();
    this.sourceIssi = this._io.readBitsIntBe(24);
    this.destinationIssi = this._io.readBitsIntBe(24);
    this._io.alignToByte();
    this.protocol = this._io.readU1();
    this.sdsType = this._io.readBitsIntBe(3);
    this.ss = this._io.readBitsIntBe(1) != 0;
    this.reserved = this._io.readBitsIntBe(4);
    this._io.alignToByte();
    this.msgReference = this._io.readU1();
    this.areaSelection = this._io.readU1();
    this.tlLength = this._io.readU2be();
    this.tlPdu = this._io.readU1();
    this.pduType = this._io.readBitsIntBe(2);
    this.timeElapsed = this._io.readBitsIntBe(2);
    this.longitude = this._io.readBitsIntBe(25);
    this.latitude = this._io.readBitsIntBe(24);
    this.positionError = this._io.readBitsIntBe(3);
    this.horizontalVelocity = this._io.readBitsIntBe(7);
    this.directionOfTravel = this._io.readBitsIntBe(4);
    this.aditionalData = this._io.readBitsIntBe(1) != 0;
    if (this.aditionalData == false) {
      this.reasonSending = this._io.readBitsIntBe(8);
    }
    if (this.aditionalData == true) {
      this.userDefinedData = this._io.readBitsIntBe(8);
    }
  }

  return Lip;
})();
return Lip;
}));
