import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    badge,
    rating,
    reviewsCount,
  } = product;

  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const formatPrice = (value) =>
    new Intl.NumberFormat('ru-RU').format(value) + ' ₽';

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card__image">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className="product-card__placeholder">📦</div>
        )}

        {badge && <span className="product-card__badge">{badge}</span>}
        {hasDiscount && !badge && (
          <span className="product-card__badge product-card__badge--discount">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="product-card__info">
        {category && <span className="product-card__category">{category}</span>}
        <h3 className="product-card__name">{name}</h3>

        {rating !== undefined && (
          <div className="product-card__rating">
            <span className="product-card__stars">
              {'★'.repeat(Math.round(rating))}
              {'☆'.repeat(5 - Math.round(rating))}
            </span>
            {reviewsCount !== undefined && (
              <span className="product-card__reviews">({reviewsCount})</span>
            )}
          </div>
        )}

        <div className="product-card__price">
          <span className="product-card__price-current">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="product-card__price-old">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <button
          className="btn btn-primary product-card__btn"
          onClick={(e) => {
            e.preventDefault();
            // TODO: интеграция с useCart
            console.log('Add to cart:', id);
          }}
        >
          В корзину
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;