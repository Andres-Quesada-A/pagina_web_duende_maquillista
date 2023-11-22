function WeekHeader() {
    return (
        <div className="flex flex-row flex-wrap mt-3 h-fit [&>div]:w-1/7 font-bold [&>div]:text-center uppercase text-sm [&>div]:border-l [&>div:nth-child(7n+1)]:border-l-0 [&>div]:border-gray-300">
            <div><p className="md:hidden">Lun</p><p className="hidden md:block">Lunes</p></div>
            <div><p className="md:hidden">Mar</p><p className="hidden md:block">Martes</p></div>
            <div><p className="md:hidden">Mié</p><p className="hidden md:block">Miércoles</p></div>
            <div><p className="md:hidden">Jue</p><p className="hidden md:block">Jueves</p></div>
            <div><p className="md:hidden">Vie</p><p className="hidden md:block">Viernes</p></div>
            <div><p className="md:hidden">Sáb</p><p className="hidden md:block">Sábado</p></div>
            <div><p className="md:hidden">Dom</p><p className="hidden md:block">Domingo</p></div>
        </div>
    )
}

export default WeekHeader;