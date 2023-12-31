import { Link } from 'react-router-dom';
import { Text } from './data';
import { Barbell, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react';
import { FooterTexts } from './data';
import { List } from './data';
import { useCallback } from 'react';

const Footer = () => {
    const renderIcon = useCallback((element) => {
        switch (element) {
            case 0:
                return <MapPin size={20} color="currentColor" />;
            case 1:
                return <EnvelopeSimple size={20} color="currentColor" />;
            case 2:
                return <Phone size={20} color="currentColor" />;
            default:
                return null;
        }
    }, []);

    return (
        <div className="w-full bg-[#151212] h-[500px] pt-6 self-end">
            <footer className="w-full bg-zinc-950 flex flex-col text-white  ">
                <main className="w-full lg:pt-28 lg:pb-12 pt-20 pb-12 px-6 grid md:grid-cols-3 lg:gap-8 md:gap-5 gap-8 lg:px-32">
                    <div className="flex flex-col gap-2">
                        <Link
                            to={`/`}
                            className="font-extrabold flex items-center relative md:text-3xl text-2xl"
                        >
                            <Text
                                as="span"
                                className="text-red-800 absolute -top-5 md:left-5 left-3"
                            >
                                <Barbell
                                    size={35}
                                    color="currentColor"
                                    weight="fill"
                                />
                            </Text>
                            <Text as="span" className="text-white">
                                Universe
                            </Text>
                            <Text
                                as="span"
                                className="bg-red-800 bg-clip-text text-transparent"
                            >
                                Gym
                            </Text>
                        </Link>
                        <Text as="p" className="text-zinc-400 text-justify">
                            {FooterTexts.underLogoText}
                        </Text>
                    </div>

                    {/* Quick Links  */}
                    <div className="flex flex-col md:items-center md:mt-8 gap-4">
                        <Text
                            as="h1"
                            className="text-zinc-300 text-2xl font-bold"
                        >
                            {FooterTexts.quickLinks.caption}
                        </Text>
                        <ul className="flex flex-col gap-2">
                            {FooterTexts.quickLinks.links.map((link, index) => (
                                <List className="text-zinc-400" key={index}>
                                    <Link
                                        to={link.url}
                                        className="transition-all duration-200 hover:text-red-500"
                                    >
                                        {link.name}
                                    </Link>
                                </List>
                            ))}
                        </ul>
                    </div>

                    {/* Quick contacts  */}
                    <div className="flex flex-col md:mt-8 gap-6">
                        <Text
                            as="h1"
                            className="text-zinc-300 text-2xl font-bold"
                        >
                            {FooterTexts.contacts.caption}
                        </Text>
                        <ul className="flex flex-col gap-4">
                            {FooterTexts.contacts.names.map((name, index) => (
                                <List
                                    className="text-zinc-400 flex items-start gap-2"
                                    key={index}
                                >
                                    <Text
                                        as="span"
                                        className="text-red-800 mt-1"
                                    >
                                        {renderIcon(index)}
                                    </Text>
                                    <Text as="span" className="">
                                        {name.name}
                                    </Text>
                                </List>
                            ))}
                        </ul>
                    </div>
                </main>
                <div className="text-center py-3 bg-red-800">
                    <Text
                        as="p"
                        className="text-zinc-200 md:text-sm text-xs font-bold"
                    >
                        {FooterTexts.copyright}
                    </Text>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
