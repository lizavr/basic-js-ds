const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    if (!this.rootNode) {
      return null;
    }
    return this.rootNode;
  }

  add(data) {
    const create = (parentNode, data) => {
      if (parentNode.data > data && !parentNode.left) {
        parentNode.left = new Node(data);
      }

      if (parentNode.data < data && !parentNode.right) {
        parentNode.right = new Node(data);
      }

      if (parentNode.data > data && parentNode.left) {
        create(parentNode.left, data);
      }
      if (parentNode.data < data && parentNode.right) {
        create(parentNode.right, data);
      }
    };

    if (!this.rootNode) {
      const node = new Node(data);
      this.rootNode = node;
      return;
    }
    create(this.rootNode, data);
  }

  has(data) {
    const hasNumber = (parentNode, data) => {
      if (!parentNode) {
        return false;
      }
      if (parentNode.data === data) {
        return true;
      }
      if (parentNode.data > data) {
        return !parentNode.left ? false : hasNumber(parentNode.left, data);
      }
      if (parentNode.data < data) {
        return !parentNode.right ? false : hasNumber(parentNode.right, data);
      }
    };
    return hasNumber(this.rootNode, data);
  }

  find(data) {
    const findNumber = (parentNode, data) => {
      if (!parentNode) {
        return null;
      }
      if (parentNode.data === data) {
        return parentNode;
      }
      if (parentNode.data > data) {
        return !parentNode.left ? null : findNumber(parentNode.left, data);
      }
      if (parentNode.data < data) {
        return !parentNode.right ? null : findNumber(parentNode.right, data);
      }
    };
    return findNumber(this.rootNode, data);
  }

  remove(data) {
    const minNumber = (parentNode) => {
      if (parentNode.left) {
        return minNumber(parentNode.left);
      }
      return parentNode;
    };
    const removeNumber = (parentNode, data) => {
      if (data > parentNode.data) {
        if (!parentNode.right) {
          return;
        }
        if (parentNode.right.data === data) {
          if (!parentNode.right.right && !parentNode.right.left) {
            parentNode.right = null;
            return;
          }
          if (!parentNode.right.right && parentNode.right.left) {
            parentNode.right = parentNode.right.left;
            return;
          }
          if (parentNode.right.right && !parentNode.right.left) {
            parentNode.right = parentNode.right.right;
            return;
          }
          if (parentNode.right.right && parentNode.right.left) {
            const min = minNumber(parentNode.right.right);
            removeNumber(parentNode.right, min.data);
            min.left = parentNode.right.left;
            min.right = parentNode.right.right;
            parentNode.right = min;
            return;
          }
        } else {
          removeNumber(parentNode.right, data);
        }
      }
      if (data < parentNode.data) {
        if (parentNode.left.data === data) {
          if (!parentNode.left.right && !parentNode.left.left) {
            parentNode.left = null;
            return;
          }
          if (!parentNode.left.right && parentNode.left.left) {
            parentNode.left = parentNode.left.left;
            return;
          }
          if (parentNode.left.right && !parentNode.left.left) {
            parentNode.left = parentNode.left.right;
            return;
          }
          if (parentNode.left.right && parentNode.left.left) {
            const min = minNumber(parentNode.left.right);
            removeNumber(parentNode.left, min.data);
            min.left = parentNode.left.left;
            min.right = parentNode.left.right;
            parentNode.left = min;
            return;
          }
        } else {
          removeNumber(parentNode.left, data);
        }
      }
    };
    if (this.rootNode.data !== data) {
      removeNumber(this.rootNode, data);
    } else {
      if (!this.rootNode.right && !this.rootNode.left) {
        this.rootNode = null;
        return;
      }
      if (!this.rootNode.right && this.rootNode.left) {
        this.rootNode = this.rootNode.left;
        return;
      }
      if (this.rootNode.right && !this.rootNode.left) {
        this.rootNode = this.rootNode.right;
        return;
      }
      if (this.rootNode.right && this.rootNode.left) {
        const min = minNumber(this.rootNode.right);
        removeNumber(this.rootNode, min.data);
        min.left = this.rootNode.left;
        min.right = this.rootNode.right;
        this.rootNode = min;
        return;
      }
    }
  }

  min() {
    const minNumber = (parentNode) => {
      if (parentNode.left) {
        return minNumber(parentNode.left);
      }
      return parentNode.data;
    };

    if (!this.rootNode) {
      return null;
    }
    if (this.rootNode.left) {
      return minNumber(this.rootNode.left);
    } else {
      return this.rootNode.data;
    }
  }

  max() {
    const maxNumber = (parentNode) => {
      if (parentNode.right) {
        return maxNumber(parentNode.right);
      }
      return parentNode.data;
    };

    if (!this.rootNode) {
      return null;
    }
    if (this.rootNode.right) {
      return maxNumber(this.rootNode.right);
    } else {
      return this.rootNode.data;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
