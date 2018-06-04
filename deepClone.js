function deepClone (obj) {
  const children = [];
  const parents = [];

  const _clone = (parent) => {
    if (parent === null) { return null; }
    if (typeof parent !== 'object') { return parent; }

    let child, proto;

    proto = Object.getPrototypeOf(parent); //获取原对象的原型
    child = Object.create(proto); //以此原型创造一个新的对象

    const index = parents.indexOf(parent);
  
    if (index !== -1) {
      return children[index];
    }
  
    parents.push(parent);
    children.push(child);
  
    for(let i in parent) {
      child[i] = _clone(parent[i]);
    }
  
    return child;
  }

  return _clone(obj);
}
