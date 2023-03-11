class Node{
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
  constructor(array) {
    this.sorted_arr = [...new Set(array)].sort(function(a,b){return a-b})
    this.root = this.buildTree(this.sorted_arr)
  }
  //Write a buildTree
  buildTree(sorted_arr){
    if (sorted_arr.length === 0) return null;
    const mid = Math.floor(sorted_arr.length/2)
    const leftHalf = sorted_arr.slice(0,mid);
    const rightHalf = sorted_arr.slice(mid + 1)
    const newNode = new Node(sorted_arr[mid], this.buildTree(leftHalf), this.buildTree(rightHalf));
    return newNode
  }
  //Write an insert and delete
  insert(value){
    let current = this.root;
    let previous;
    while(current){
      previous = current
      if(value<current.value){
        current = current.left
      }else if(value > current.value){
        current = current.right
      }else{
        return
      }
    }
    if(value < previous.value){
      previous.left = new Node(value);
    }else{
      previous.right = new Node(value);
    }
  }
  // delete on the work
  //Write a find function which accepts a value and returns the node with the given value.

  find(value){
    let current = this.root;
    while(current){
      if(value<current.value){
        current = current.left
      }else if(value > current.value){
        current = current.right
      }else{
        return current
      }
    }
    return null
  }

  //Write a levelOrder function which accepts another function as a parameter.

  levelOrder(){
    let levelOrderArray = [];
    let queve = [];
    queve.push(this.root);  //5
    while(queve.length > 0){ //[node(5)]
      let node = queve[0]; // i take the first node on the array
      levelOrderArray.push(node.value) //push it's value [5]
      if(node.left){queve.push(node.left)} // [node(5), node(2)]
      if(node.right){queve.push(node.right)} // [node(5),node(2), node(8)]
      queve.shift(); //[node(2),node(8)]
    }
    return levelOrderArray;
  }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


const array = [1,2,8,3,7,5]
const tree = new Tree(array)
tree.insert(6)
tree.insert(4)
tree.insert(9)
tree.insert(20)
prettyPrint(tree.root)
console.log(tree.find(8))
console.log(tree.levelOrder())

