import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) /2))",
  minHeight: 656,
  marginLeft: "auto",
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 12,
  cursor: "pointer",
    
  display: " flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    right: "0.25rem",
    left: "0.25rem",

    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 6,
    height: "15%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"0 2rem 0 2rem",
    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    strong: {
      fontSize: "$lg",
      color: "$gray100",
    },

    span: {
      fontSize: "$2xl",
      fontWeight: "bold",
      color: "$green500",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
