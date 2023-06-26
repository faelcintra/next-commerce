import { styled } from "..";

export const DivSuccess = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },
  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    marginTop: "5rem",
    fontSize: "$lg",
    flex: "1",
    color: "$green500",
    fontWeight: "bold",
    textDecoration: "none",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const DivImage = styled("div", {
  width: "100%",
  maxWidth: 130,
  height: 143,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  marginTop: "4rem",
  padding: "0.25rem",

  display: "flex",
  alignContent: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
