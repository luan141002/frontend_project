export const FooterTexts = {
    underLogoText:
        'We are more than just a gym; we are a passionate and supportive fitness family dedicated to helping you achieve your health and wellness goals. Our mission is to create a positive and empowering environment that inspires you to challenge yourself, embrace a healthy lifestyle, and discover the best version of yourself.',
    quickLinks: {
        caption: 'Quick Links',
        links: [
            {
                name: 'Home',
                url: '/',
            },
            {
                name: 'About Us',
                url: '/about',
            },
            {
                name: 'Schedule',
                url: '/schedule',
            },
            {
                name: 'Gallery',
                url: '/gallery',
            },
            {
                name: 'News',
                url: '/news',
            },
            {
                name: 'Contacts',
                url: '/contact',
            },
        ],
    },
    contacts: {
        caption: 'Quick Contacts',
        names: [
            {
                name: 'No.1, Vo Van Ngan, Thu duc, HCMC',
            },
            {
                name: 'universe@example.com',
            },
            {
                name: '+1 424-248-8496',
            },
        ],
    },
    copyright: 'Copyright 2023. All Right Reserved',
};
export const Text = ({ className, children, as = 'div' }) => {
    const Component = as || 'div';
    return <Component className={className}>{children}</Component>;
};
export const List = ({ className, children, ...rest }) => {
    return (
        <>
            <li className={className} {...rest}>
                {children}
            </li>
        </>
    );
};
