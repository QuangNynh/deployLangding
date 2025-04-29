'use client';

import BotIcon from '@/assets/icons/bot-icon';
import ChatIcon from '@/assets/icons/chat-icon';
import CloseIcon from '@/assets/icons/close-icon';
import LogoOnlyIcon from '@/assets/icons/logo-only';
import SendIcon from '@/assets/icons/send-icon';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { chatBotService } from '@/services/chatBotService';
import ReactMarkdown, { Components } from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const ChatBot = () => {
    const { t } = useTranslation('chat-bot');
    const pathname = usePathname();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([{ from: 'bot', text: t('defaultMessage') }]);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const componentConfig: Components = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        a: ({ node, ...rest }) => (
            <a
                {...rest}
                style={{
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                }}
                target="_blank"
                rel="noopener noreferrer"
            />
        ),
    };

    const sendMessageToBot = useMutation({
        mutationFn: (data: string) => {
            setIsTyping(true);
            setInput('');
            setMessages([...messages, { from: 'user', text: input.trim() }]);
            return chatBotService.sendMessageToBot(data);
        },
        onSuccess: (data: string) => {
            setMessages((prev) => [...prev, { from: 'bot', text: data }]);
            setIsTyping(false);
        },
        onError: () => {
            setMessages((prev) => [...prev, { from: 'bot', text: t('errorMessage') }]);
            setIsTyping(false);
        },
    });

    const sendMessage = () => {
        if (!input.trim() || isTyping) return;

        sendMessageToBot.mutate(input.trim());
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            (inputRef.current as HTMLInputElement).focus();
        }
        bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="fixed right-5 bottom-5 z-50 flex items-end gap-9 max-md:flex-col max-md:gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="relative flex h-[562px] w-[321px] flex-col overflow-hidden rounded-2xl bg-[#FAF8F8] pb-8 shadow-xl"
                    >
                        <div className="absolute top-0 z-50 mb-0 flex h-[68px] w-full items-center justify-between bg-white p-4 shadow-md">
                            <h3 className="flex items-center gap-4 text-base font-bold">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-[4px] border-[#D6D6D67A] bg-white">
                                    <LogoOnlyIcon />
                                </div>
                                Katech
                            </h3>
                            <button onClick={toggleChat} className="cursor-pointer">
                                <CloseIcon className="text-[red]" />
                            </button>
                        </div>

                        <div className="no-scrollbar relative mt-[68px] flex flex-1 flex-col gap-3 space-y-2 overflow-y-auto px-4 pt-4">
                            {messages.map((msg, idx) => {
                                return msg.from === 'user' ? (
                                    <div
                                        key={idx}
                                        className={`ml-auto self-end rounded-3xl bg-gradient-to-r from-[#FF4D4D] to-[#FF0000] px-5 py-3 text-sm text-white`}
                                    >
                                        <ReactMarkdown components={componentConfig}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="mt-[30px] flex items-end gap-4" key={idx}>
                                        <div className="flex min-h-8 min-w-8 items-center justify-center rounded-full border-[2px] border-[#D6D6D67A] bg-white">
                                            <BotIcon />
                                        </div>
                                        <div
                                            className={`mr-auto self-start rounded-3xl bg-[#F5EBEB] px-5 py-3 text-sm text-gray-800`}
                                        >
                                            <ReactMarkdown components={componentConfig}>
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                );
                            })}
                            {isTyping && (
                                <div className="mt-[30px] flex items-end gap-4">
                                    <div className="flex min-h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#D6D6D67A] bg-white">
                                        <BotIcon />
                                    </div>
                                    <div className="mr-auto flex gap-1 self-start rounded-3xl bg-[#F5EBEB] px-5 py-3 text-sm text-gray-800">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-800"></div>
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-800"></div>
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-800"></div>
                                    </div>
                                </div>
                            )}

                            <div className="min-h-6" ref={bottomRef}></div>
                        </div>
                        <div className="relative w-full">
                            <div className="absolute -bottom-4 left-4 flex h-[40px] w-[calc(100%-32px)] items-center rounded-full bg-white pr-2 shadow-sm">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    ref={inputRef}
                                    placeholder={t('placeholder-input')}
                                    className="h-[28px] w-full rounded-[22px] bg-white p-4 text-base outline-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isTyping}
                                    className={`ml-2 flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-full bg-black bg-gradient-to-r from-[#FF4D4D] to-[#FF0000] ${
                                        !input.trim() || isTyping ? 'opacity-50' : ''
                                    }`}
                                >
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.button
                        key="close"
                        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                        transition={{ duration: 0.25, ease: 'linear' }}
                        onClick={toggleChat}
                        className="flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 max-md:hidden max-md:h-12 max-md:w-12"
                    >
                        <CloseIcon color="#FF0000" />
                    </motion.button>
                ) : (
                    <motion.button
                        key="open"
                        initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        transition={{ duration: 0.25, ease: 'linear' }}
                        onClick={toggleChat}
                        className="flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#FF0000] shadow-lg transition hover:scale-105 max-md:h-12 max-md:w-12"
                    >
                        <ChatIcon />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;
