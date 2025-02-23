const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem'); // Đổi CartDetail thành CartItem nếu đã đổi tên model
const Product = require('../models/Product');

const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({
            where: { userID: userId }, // Đổi 'user_id' thành 'userID' cho nhất quán với model
            include: [
                {
                    model: CartItem, // Đảm bảo sử dụng đúng model (CartItem)
                    as: 'cartItems', // Alias đúng với associations.js
                    include: [
                        {
                            model: Product,
                            as: 'product', // Alias đúng với associations.js
                            attributes: ['name', 'price']
                        }
                    ]
                }
            ]
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (!cart.cartItems || cart.cartItems.length === 0) {
            return res.json({ cartId: cart.cartID, items: [] });
        }

        const result = cart.cartItems.map(detail => ({
            productName: detail.product?.name ?? 'N/A', // Lấy 'name' từ product
            quantity: detail.quantity,
            price: detail.price
        }));

        res.json({ cartId: cart.cartID, items: result });

    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addCartItem = async (req, res) => {
    try {
        const { cartID, productID, quantity = 1 } = req.body;

        // Kiểm tra số lượng phải là số dương
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findByPk(productID);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingCartItem = await CartItem.findOne({ where: { cartID, productID } });

        if (existingCartItem) {
            // Nếu sản phẩm đã có, cộng dồn số lượng
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({
                message: 'Đã cập nhật số lượng sản phẩm trong giỏ hàng',
                cartItem: existingCartItem,
            });
        } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
            const price = product.price; // Lấy giá sản phẩm hiện tại
            const newCartItem = await CartItem.create({
                cartID,
                productID,
                quantity,
                price,
            });
            return res.status(201).json({
                message: 'Đã thêm sản phẩm vào giỏ hàng',
                cartItem: newCartItem,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
    }
};
const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemID } = req.params; // Lấy cartItemID từ URL
        const { quantity } = req.body; // Lấy quantity từ request body

        // Kiểm tra số lượng phải là số không âm
        if (quantity < 0) {
            return res.status(400).json({ message: 'Số lượng không hợp lệ' });
        }

        // Tìm CartItem theo ID
        const cartItem = await CartItem.findByPk(cartItemID);

        // Kiểm tra CartItem có tồn tại không
        if (!cartItem) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
        }

        if (quantity === 0) {
            // Nếu số lượng = 0, xóa CartItem khỏi giỏ hàng
            await cartItem.destroy();
            return res.status(200).json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
        } else {
            // Cập nhật số lượng
            cartItem.quantity = quantity;
            await cartItem.save();
            return res.status(200).json({
                message: 'Đã cập nhật số lượng sản phẩm trong giỏ hàng',
                cartItem,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật số lượng sản phẩm' });
    }
};

module.exports = {
    getCartByUserId,
    addCartItem,
    updateCartItemQuantity,
}
