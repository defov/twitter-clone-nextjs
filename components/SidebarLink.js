

const SidebarLink = ({ Icon, text, active, onClick }) => {
    return (
        <div 
            className={`flex items-center justify-center xl:w-full xl:justify-start text-xl hoverAnimation ${active && 'font-bold'}`}
            onClick={(e) => {onClick && onClick(e)}}
        >
            <Icon className="sideberIcon" />
            <span className="hidden xl:inline px-4">{text}</span>
        </div>
    )
}

export default SidebarLink
