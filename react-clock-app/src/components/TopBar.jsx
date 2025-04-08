import { useEffect, useState } from 'react';

function TopBar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full bg-gray-900 text-white py-2 px-4 flex justify-between items-center shadow'>
            <span className='text-sm'>{time.toLocaleTimeString()}</span>
        </div>
    );
}
export default TopBar;