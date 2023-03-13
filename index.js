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

  levelOrder(levelOrderArray = []){
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

  // Write inorder, preorder, and postorder

  inorder(arr = [], root = this.root) {
    if (root === null) return;
    
    if (root.left) this.inorder(arr, root.left);
    
    arr.push(root.value);

    if (root.right) this.inorder(arr, root.right);
   
    return arr;
  }

  preorder(arr = [], root = this.root) {
    if (root === null) return;

    arr.push(root.value);

    if (root.left) this.preorder(arr, root.left);
    
    if (root.right) this.preorder(arr, root.right);
    
    return arr;
  }

  postorder(arr = [], root = this.root) {
    if (root === null) return;

    if (root.left) this.postorder(arr, root.left);

    if (root.right) this.postorder(arr, root.right);
  
    arr.push(root.value);

    return arr;
  }
  //Write a height function which accepts a node and returns its height.
  height(node = this.root){
    if (node === null) return -1;
    if (node.left === null && node.right === null){
      return 0
    }
    const lh = this.height(node.left);
    const rh = this.height(node.right);
    return Math.max(lh,rh) +1
  }
  //Write a depth function which accepts a node and returns its depth.
  depth(node, root = this.root, counter = 0) {
    if (node === null){return 0}
    if (node === root){return 'Depth of ' + node.value + ': ' + counter}
    if(node.value < root.value){return this.depth(node,root.left,counter +=1)}
    if(node.value > root.value){return this.depth(node,root.right,counter +=1)}
  }
  //Write a isBalanced function which checks if the tree is balanced.
  isBalanced(root = this.root){
    if (root === null){return 0}
    const lh = this.height(root.left);
    const rh = this.height(root.right);
    if (Math.abs(rh - lh) >= 2 && Math.abs(rh - lh) <= 0 ){return false}
    else{return true}
  }
  //Write a rebalance function which rebalances an unbalanced tree. 
  rebalance(root = this.root){
    if (root === null){return null}
    else if(this.isBalanced()){return 'the tree is balanced'}
    else{
      let newTree = new Tree(this.preorder());
      console.log(newTree)
      return newTree
    }
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


const array = [1,2,8,3,7,5,6]
const tree = new Tree(array)
tree.insert(6)
tree.insert(4)
tree.insert(9)
tree.insert(20)
prettyPrint(tree.root)
console.log(tree.find(8))
console.log(tree.levelOrder())
console.log(tree.inorder())
console.log(tree.preorder())
console.log(tree.postorder())
console.log(tree.height());
console.log(tree.depth(tree.find(8)));
console.log(tree.isBalanced());

