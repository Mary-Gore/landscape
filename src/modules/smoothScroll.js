const smoothScroll = () => {
  const scrollMenu = document.querySelectorAll('.scroll-menu');
  scrollMenu.forEach(item => {
    const links =  item.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();

        const section = document.querySelector(link.getAttribute('href'));

        if (section) {
          seamless.scrollIntoView(section, {
            behavior: "smooth",
            block: "start",
            inline: "center",
          });
        }
      });
    });
  });
};

export default smoothScroll;
