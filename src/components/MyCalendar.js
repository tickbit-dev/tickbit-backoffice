import { Input } from '@chakra-ui/react'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function MyCalendar({...props}) {
    const [date, setDate] = useState()

    return(
        <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy'>
            {({ inputProps, focused }) => (
                <Input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='DD/MM/YYYY' />
            )}
        </DatePicker>
    )
}