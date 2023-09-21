import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageBtns = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageBtn = styled.div`
  overflow: hidden;
  border: 1px solid ${(p) => (p.active ? `red` : `transparent`)};
  opacity: ${(p) => (p.active ? `1` : `0.7`)};
  padding: 2px;

  border-radius: 5px;
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Div = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProductImages({ images = [], alt }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <Div>
        <Image style={{ maxWidth: "100%" }} src={activeImage} alt={alt} />
      </Div>
      <ImageBtns>
        {images.map((image) => (
          <ImageBtn
            active={image === activeImage ? 1 : 0}
            onClick={() => setActiveImage(image)}
            key={image}
          >
            <Image src={image} alt={image} />
          </ImageBtn>
        ))}
      </ImageBtns>
    </>
  );
}
