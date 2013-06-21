var lib = {
  realToNormalized: function(realNum){
    if(this.type === 'continuous'){
      return (realNum - this.min) / (this.max - this.min);
    } else if(metaArray[i].type === 'discrete'){
      throw new Error("discrete not handled yet!");// TODO
    } else { throw new Error('unknown type from metaArray[i].type: ' + metaArray[i].type) }
  },

  normalizedToReal: function(normalizedNum){
    if(this.type === 'continuous'){
      return normalizedNum * (this.max - this.min) + this.min;
    } else if(metaArray[i].type === 'discrete'){
      throw new Error("discrete not handled yet!");// TODO
    } else { throw new Error('unknown type from metaArray[i].type: ' + metaArray[i].type) }
  }
}