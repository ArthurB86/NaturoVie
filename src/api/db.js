/**
 * Couche de données Supabase — remplace base44.entities.*
 * Utilise le localStorage pour simuler la DB sans Supabase configuré.
 */
import { supabase } from '@/lib/supabase'

function createEntity(table) {
  return {
    list: async (order = '-created_at', limit = 100) => {
      let q = supabase.from(table).select('*')
      if (order.startsWith('-')) q = q.order(order.slice(1), { ascending: false })
      else q = q.order(order, { ascending: true })
      if (limit) q = q.limit(limit)
      const { data, error } = await q
      if (error) throw error
      return data ?? []
    },
    get: async (id) => {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
      if (error) throw error
      return data
    },
    create: async (payload) => {
      const { data, error } = await supabase.from(table).insert({ ...payload, created_at: new Date().toISOString() }).select().single()
      if (error) throw error
      return data
    },
    update: async (id, payload) => {
      const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single()
      if (error) throw error
      return data
    },
    delete: async (id) => {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
    },
  }
}

export const db = {
  healthProfile: createEntity('profils'),
  nutritionPlan: createEntity('nutrition_plans'),
  cure: createEntity('cures'),
  activityProgram: createEntity('activity_programs'),
  evolution: createEntity('evolution'),
  post: createEntity('posts'),
  stravaImport: createEntity('strava_imports'),
}
