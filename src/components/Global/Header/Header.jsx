import CardNav from './CardNav'









const Header = () => {
  const items = [
    {
      label: "Image",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Creative Images", ariaLabel: "About Company", href: "/creative-images" }
        // { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
      ]
    },
    {
      label: "Gif", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Gifs", ariaLabel: "Featured Projects", href: "/gifs" }
        // { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/case-studies" }
      ]
    },
    {
      label: "Videos",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        // internal routes example
        { label: "Videos", ariaLabel: "Email us", href: "/videos" }

      ]
    }
  ];

  return (
    <CardNav
      logo="/logoheader.svg"
      logoAlt="Comp Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000000"
      buttonBgColor="#000000"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Header;
