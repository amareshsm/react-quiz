import React from 'react';
const Loader = ({
    style = {margin:"auto",backgroundColor:"#fff",display:"block"},
    fill = '#fff',
    width = '60',
    className = '',
    height = '60',
    viewBox = '0 0 100 100',
    preserveAspectRatio='xMidYMid'
  }) => 
    <svg
      width={width}
      style={style}
      height={height}
      viewBox={viewBox}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d="some path here" fill={fill} />        
<g transform={"rotate(134.555 50 50)"}>
  <path d="M50 29A21 21 0 1 0 69.27284713936362 41.65989429666962" fill={"none"} stroke={"#5b6be1"} strokeWidth={"10"}></path>
  <path d="M49 15L49 43L63 29L49 15" fill="#5b6be1"></path>
  <animateTransform attributeName={"transform"} type={"rotate"} repeatCount={"indefinite"}  dur={"1.8181818181818181s"} values={"0 50 50;360 50 50"}  keyTimes={"0;1"}></animateTransform>
</g>
    </svg>;
export default Loader;
