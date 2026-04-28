import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'

const severityDot: Record<string, string> = {
  low_data: 'bg-red-500',
  plan_expiry: 'bg-amber-500',
  bill_due: 'bg-amber-500',
  emergency_recharge: 'bg-blue-500',
  default: 'bg-emerald-500',
}

export function ReminderDropdown() {
  const [notifications, setNotifications] = useState<any[]>([])
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchNotifs = async () => {
      if (!isAuthenticated || !user?._id) return
      try {
        const res = await api.get(`/notifications/${user._id}`)
        if (res.data.success) {
          setNotifications(res.data.data)
        }
      } catch (error) {
        console.error('Failed to load notifications')
      }
    }
    fetchNotifs()
  }, [user, isAuthenticated])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="Recharge reminders"
        >
          <Bell className="h-5 w-5 text-primary" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel className="text-primary">
          Recharge alerts & reminders
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
           notifications.map((r) => (
             <DropdownMenuItem key={r._id} className={cn("flex-col items-start gap-1 py-2", !r.read && "bg-muted/30")}>
               <div className="flex w-full items-start gap-2">
                 <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', severityDot[r.type] || severityDot.default)} />
                 <span className="flex-1 leading-snug">{r.message}</span>
               </div>
               <span className="pl-4 text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
             </DropdownMenuItem>
           ))
        ) : (
           <div className="px-4 py-3 text-sm text-muted-foreground text-center">No notifications yet.</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
