import styled from 'styled-components'

export const Product = ({
  name = null,
  description = null,
  price = null,
  imageUrl = null,
  productId = null,
}) => {
  return (
    <ProductStyled>
      <img
        src={imageUrl}
        alt={name}
      />

      <div className="product__info">
        <InfoStyled
          className={
            "info__name"
          }
        >
          {name}
        </InfoStyled>
        <InfoStyled
          className={
            "info__description"
          }
        >
          {description}
        </InfoStyled>
        <InfoStyled
          className={
            "info__price"
          }
        >
          {price ? "$" + price : ""}
        </InfoStyled>
      </div>
    </ProductStyled>
  );
};



const ProductStyled = styled.div`
  width: 300px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .product__info > p {
    margin-bottom: 8px;
  }
`;

const InfoStyled = styled.p`
  margin-bottom: 8px;

  &.info__name {
    font-size: 1rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  &.info__price {
    font-weight: bold;
  }

  &.info__description {
    font-size: 0.8rem;
  }
`;