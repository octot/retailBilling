import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoCloseOutline } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";

const sizeIcons = 35;
// Example SVG icons with colors
const WhatsAppIcon = () => <FaWhatsapp size={sizeIcons} color="#25D366" />;

const GmailIcon = () => <SiGmail size={sizeIcons} color="#D14836" />;

const TelegramIcon = () => <FaTelegramPlane size={sizeIcons} color="#0088CC" />;
const CloseIcon = () => <IoCloseOutline size={24} color="#000000" />;

const ShareIcon = () => (
  <FiShare2 size={24} color="#000000" style={{ marginRight: "8px" }} />
);
export { WhatsAppIcon, GmailIcon, TelegramIcon, CloseIcon, ShareIcon };
