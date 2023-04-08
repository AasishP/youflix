import React, { useLayoutEffect, useRef } from "react";
import "./Skeleton.css";

function Skeleton(
  { height, width, borderRadius, margin, padding } = {
    height: "1em",
    width: "5em",
    borderRadius: "3em",
    margin: "initial",
    padding: "initial",
  }
) {
  const skeletonRef = useRef();

  useLayoutEffect(() => {
    skeletonRef.current.style.height = height;
    skeletonRef.current.style.width = width;
    skeletonRef.current.style.borderRadius = borderRadius;
    skeletonRef.current.style.margin = margin;
    skeletonRef.current.style.padding = padding;
  }, [height, width, borderRadius, margin, padding]);

  return <div className="container" ref={skeletonRef}></div>;
}

export default Skeleton;
