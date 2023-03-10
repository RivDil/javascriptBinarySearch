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
  buildTree(sorted_arr){
    if (sorted_arr.length === 0) return null;
    const mid = Math.floor(sorted_arr.length/2)
    const leftHalf = sorted_arr.slice(0,mid);
    const rightHalf = sorted_arr.slice(mid + 1)
    const newNode = new Node(sorted_arr[mid], this.buildTree(leftHalf), this.buildTree(rightHalf));
    return newNode
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


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(array)
prettyPrint(tree.root)

