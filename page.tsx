'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Notification = {
  id: number
  title: string
  type: 'Critical' | 'Warning' | 'Info'
  message: string
  created_at: string
}

export default function NotificationsPage() {
  const supabase = createClient()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setNotifications(data as Notification[])
    }

    fetchNotifications()
  }, [])

  const colorByType = (type: string) => {
    switch (type) {
      case 'Critical':
        return 'bg-red-500 text-white'
      case 'Warning':
        return 'bg-yellow-500 text-black'
      case 'Info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Powiadomienia IT</h1>
      <div className="grid gap-4">
        {notifications.map((note) => (
          <Card key={note.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{note.title}</span>
                <Badge className={colorByType(note.type)}>{note.type}</Badge>
              </div>
              <p className="text-sm text-gray-700">{note.message}</p>
              <p className="text-xs text-right text-gray-400 mt-2">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
