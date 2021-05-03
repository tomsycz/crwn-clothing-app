import React from "react";
import "./collection-preview.styles.scss";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

function CollectionPreview({ title, items, routeName, match, history }) {
  return (
    <div className="collection-preview">
      <h1
        className="link-to-collection"
        onClick={() => {
          history.push(`${match.url}/${routeName}`);
        }}
      >
        {title.toUpperCase()}
      </h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default withRouter(CollectionPreview);
