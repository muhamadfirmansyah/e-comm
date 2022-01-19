import { useState } from "react"

// Data
import SHOP_DATA from "./shop.data"

// Components
import CollectionPreview from "../../components/collection-preview/collection-preview.component"


const ShopPage = (props) => {
    

    const [collections] = useState(
        SHOP_DATA
    )

    return (
        <div className="shop-page">
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} { ...otherCollectionProps } />
                ))
            }
        </div>
    )
}

export default ShopPage