import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { User } from "../../Store/UserStore/Authentication/Interfaces";
import { useEssentials } from "../../Functions/CommonFunctions";

interface props {
    users: User[];
}

const AnimatedTooltip: React.FC<props> = ({ users }) => {
    const {navigate} = useEssentials()
    const [hoveredIndex, setHoveredIndex] = useState<string>("");
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <>
            {users.length > 0 && users.map((item, i) => (
                <div key={item.Username}>
                    {i < 4 && (
                        <div
                            className="-mr-4  relative group"
                            onMouseEnter={() => setHoveredIndex(item._id)}
                            onMouseLeave={() => setHoveredIndex("")}
                        >
                            <AnimatePresence mode="popLayout">
                                {hoveredIndex === item._id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 10,
                                            },
                                        }}
                                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                        style={{
                                            translateX: translateX,
                                            rotate: rotate,
                                            whiteSpace: "nowrap",
                                        }}
                                        className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                                    >
                                        <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                        <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                        <div className="font-bold text-white relative z-30 text-base">
                                            {item.Name}
                                        </div>
                                        <div className="text-white text-xs">{item.Username}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <img onClick={()=>navigate(`/profile/${item.ProfileLink}`)}
                                onMouseMove={handleMouseMove}
                                src={item.Profile}
                                alt={item.Name}
                                className="object-cover w-6 h-6 !m-0 !p-0 object-top rounded-full border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};


export default AnimatedTooltip