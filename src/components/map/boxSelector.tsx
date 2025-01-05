import React from 'react'
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useMapEvents } from 'react-leaflet';
import { useCounterStore } from '@/providers/counter-store-provider'
export { POSITION_CLASSES } from './map'

export default function BoxSelector({position}: {position: string}) {


    const { count, setPointStart, setPointEnd, incrementCount, startCount } = useCounterStore(
        (state) => state,
    )
  
    const _ = useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            switch (count) {
                case 0:
                    setPointStart([lng, lat])
                    incrementCount()
                    break;
                case 1:
                    setPointEnd([lng, lat])
                    incrementCount()
                    break;
                default:
                    break;
            }
        }
    })
    return (
        <div className={position}>
            <Button id="ALED" className='size-12 leaflet-control leaflet-bar' variant="default" onClick={startCount}><MapPin className='!size-8 text-primary-foreground/50' strokeWidth={2.25} /></Button>
        </div>
    )
}
