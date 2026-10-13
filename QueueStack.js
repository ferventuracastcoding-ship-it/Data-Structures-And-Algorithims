let current = this.root;

        while (true) {

            if (value < current.value) {

                if (!current.left) {

                    current.left = newNode;

                    return newNode;
                }

                current = current.left;

            } else if (value > current.value) {

                if (!current.right) {

                    current.right = newNode;

                    return newNode;
                }

                current = current.right;

            } else {

                return null;
            }
        }
    }

    search(value) {

        let current = this.root;

        const path = [];

        while (current) {

            path.push(current);

            if (value === current.value) {

                return {
                    node: current,
                    path
                };
            }

            current =
                value < current.value
                    ? current.left
                    : current.right;
        }

        return {
            node: null,
            path
        };
    }

    inorder(node = this.root, result = []) {

        if (!node) return result;

        this.inorder(node.left, result);

        result.push(node);

        this.inorder(node.right, result);

        return result;
    }

    preorder(node = this.root, result = []) {

        if (!node) return result;

        result.push(node);

        this.preorder(node.left, result);

        this.preorder(node.right, result);

        return result;
    }

    postorder(node = this.root, result = []) {

        if (!node) return result;

        this.postorder(node.left, result);

        this.postorder(node.right, result);

        result.push(node);

        return result;
    }
