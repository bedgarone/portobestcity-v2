import { Clock4 } from 'lucide-react'
import { dateFormat } from '@/app/utils'

const DateStamp: React.FC<{ dateString: string }> = ({ dateString }) => {
  return (
    <div className="text-medium-grey flex items-center gap-1">
      <Clock4 className="size-2.5" />
      <div className="font-sans text-xs font-medium">{dateFormat(dateString)}</div>
    </div>
  )
}

export default DateStamp
