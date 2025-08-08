import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { cartContext } from "../Context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { wishListContext } from "../Context/WishListContext";
import WishListItems from "../SubPages/WishListItems";
import Skeleton from "react-loading-skeleton";
import BackButton from "../Components/BackButton";


export default function WishList() {
  const { wishList, getLoggedUserWishlist, clearWishList } =
    useContext(wishListContext);
  const { loading } = useContext(cartContext);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <div className="container py-5 cart-bg my-5 rounded-5">
      <header className="d-flex justify-content-between align-items-center px-5 mb-5">
        <span className="d-flex align-items-center gap-3">
          <BackButton/>
          <h4 className="fw-bold" style={{ color: "rgb(1, 133, 76)" }}>
            Favorite Products
          </h4>
          <FontAwesomeIcon
            icon={faGratipay}
            style={{ width: "30px", height: "30px", color: "#00cc74" }}
          />
        </span>
      </header>

      {loading ? (
        <div>
          {[...Array(3)].map((_, i) => (
            <div className="mb-4 p-3 border rounded-4" key={i}>
              <Skeleton height={30} width={150} />
              <Skeleton height={20} count={2} />
            </div>
          ))}
        </div>
      ) : (
        <>
          {wishList?.data?.length > 0 ? (
            wishList.data.map((item) => <WishListItems item={item} />)
          ) : (
            <h5 className="text-center text-muted mt-5">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <p className="text-success text-center fw-medium">
                  There is no Products yet.
                </p>
                <NavLink
                  className="btn btn-success fw-bold px-3"
                  to={"/products"}
                >
                  Add Your First Product in the Cart
                </NavLink>
              </div>
            </h5>
          )}
        </>
      )}
    </div>
  );
}
