import { useState } from 'react'
import { useGame } from '../hooks/useGame.jsx'
import { DIET_PLAN } from '../data/gameData.js'
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react'

function MealCard({ meal, checked, onToggleItem }) {
  const [expanded, setExpanded] = useState(false)
  const checkedItems = checked[meal.id] || []
  const allChecked = checkedItems.length === meal.items.length

  return (
    <div className={`card overflow-hidden transition-all duration-200 ${allChecked ? 'border-neon/30' : ''}`}>
      <div
        className="p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <span className="text-2xl flex-shrink-0">{meal.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg tracking-widest text-text">{meal.name}</p>
            <span className="font-mono text-xs text-muted">{meal.time}</span>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="font-mono text-xs text-neon">{meal.protein}g protein</span>
            <span className="font-mono text-xs text-muted">{meal.calories} kcal</span>
            <span className="font-mono text-xs text-muted">{checkedItems.length}/{meal.items.length} items</span>
          </div>
          {/* mini bar */}
          <div className="xp-bar-track mt-2 h-1">
            <div
              className="xp-bar-fill"
              style={{
                width: `${meal.items.length > 0 ? (checkedItems.length / meal.items.length) * 100 : 0}%`,
                background: '#00f5d4',
              }}
            />
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
          {meal.items.map((item, i) => {
            const isChecked = checkedItems.includes(i)
            return (
              <button
                key={i}
                className="w-full flex items-center gap-3 text-left"
                onClick={() => onToggleItem(meal.id, i)}
              >
                {isChecked
                  ? <CheckCircle size={20} className="text-neon flex-shrink-0" />
                  : <Circle size={20} className="text-muted flex-shrink-0" />
                }
                <div className="flex-1">
                  <p className={`font-body text-sm ${isChecked ? 'text-neon line-through opacity-60' : 'text-text'}`}>
                    {item.name}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-[10px] text-muted">{item.protein}g pro</p>
                </div>
              </button>
            )
          })}
          <p className="font-body text-xs text-muted pt-2 italic">{meal.notes}</p>
        </div>
      )}
    </div>
  )
}

export default function DietPage() {
  const { state, completeDiet } = useGame()
  const [checkedItems, setCheckedItems] = useState({})
  const [saved, setSaved] = useState(false)

  const today = new Date().toDateString()
  const dietDoneToday = state.dietLog.some(d => d.date === today)

  const toggleItem = (mealId, itemIndex) => {
    setCheckedItems(prev => {
      const current = prev[mealId] || []
      const next = current.includes(itemIndex)
        ? current.filter(i => i !== itemIndex)
        : [...current, itemIndex]
      return { ...prev, [mealId]: next }
    })
  }

  const totalProtein = DIET_PLAN.meals.reduce((sum, meal) => {
    const checked = checkedItems[meal.id] || []
    return sum + meal.items.filter((_, i) => checked.includes(i)).reduce((s, item) => s + item.protein, 0)
  }, 0)

  const totalCals = DIET_PLAN.meals.reduce((sum, meal) => {
    const checked = checkedItems[meal.id] || []
    return sum + meal.items.filter((_, i) => checked.includes(i)).reduce((s, item) => s + item.calories, 0)
  }, 0)

  const allMealsComplete = DIET_PLAN.meals.every(meal => {
    const checked = checkedItems[meal.id] || []
    return checked.length === meal.items.length
  })

  const handleSave = () => {
    completeDiet(checkedItems)
    setSaved(true)
  }

  return (
    <div className="p-4 space-y-4 animate-slide-up">
      <div className="pt-4">
        <p className="font-mono text-xs text-muted tracking-widest">NUTRITION PROTOCOL</p>
        <h1 className="font-display text-4xl tracking-widest text-neon">FUEL SYSTEM</h1>
        <p className="font-body text-muted text-sm">Lean Bulk · {DIET_PLAN.calories} kcal · {DIET_PLAN.protein}g protein</p>
      </div>

      {/* Macro tracker */}
      <div className="card p-4 space-y-3">
        <p className="label">TODAY'S MACROS</p>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-mono text-xs text-neon">PROTEIN</span>
              <span className="font-mono text-xs text-muted">{totalProtein}g / {DIET_PLAN.protein}g</span>
            </div>
            <div className="xp-bar-track">
              <div
                className="xp-bar-fill"
                style={{
                  width: `${Math.min(100, (totalProtein / DIET_PLAN.protein) * 100)}%`,
                  background: '#00f5d4',
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-mono text-xs text-fire">CALORIES</span>
              <span className="font-mono text-xs text-muted">{totalCals} / {DIET_PLAN.calories} kcal</span>
            </div>
            <div className="xp-bar-track">
              <div
                className="xp-bar-fill"
                style={{
                  width: `${Math.min(100, (totalCals / DIET_PLAN.calories) * 100)}%`,
                  background: '#ff4d00',
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="text-center">
            <p className="font-display text-xl text-neon">{totalProtein}g</p>
            <p className="label text-[9px]">PROTEIN</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl text-fire">{totalCals}</p>
            <p className="label text-[9px]">CALORIES</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl text-gold">{DIET_PLAN.protein - totalProtein}g</p>
            <p className="label text-[9px]">REMAINING</p>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {DIET_PLAN.meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            checked={checkedItems}
            onToggleItem={toggleItem}
          />
        ))}
      </div>

      {/* Supplements */}
      <div className="card p-4">
        <p className="label mb-3">SUPPLEMENTATION</p>
        {DIET_PLAN.supplements.map((s, i) => (
          <p key={i} className="font-body text-sm text-muted flex items-start gap-2 mb-1">
            <span className="text-neon">›</span> {s}
          </p>
        ))}
      </div>

      {/* Save */}
      {!dietDoneToday && !saved ? (
        <button
          className="btn-primary w-full"
          onClick={handleSave}
          disabled={Object.keys(checkedItems).length === 0}
        >
          {allMealsComplete ? '✓ LOG PERFECT DAY (+20 XP)' : 'LOG PARTIAL DAY'}
        </button>
      ) : (
        <div className="card p-4 border-neon/30 text-center">
          <p className="font-display text-xl text-neon tracking-widest">NUTRITION LOGGED ✓</p>
          <p className="font-body text-muted text-sm mt-1">
            {totalProtein >= DIET_PLAN.protein ? 'Protein target hit. Muscles will thank you.' : `${DIET_PLAN.protein - totalProtein}g protein short. Do better tomorrow.`}
          </p>
        </div>
      )}

      {/* Meal timing guide */}
      <div className="card p-4">
        <p className="label mb-3">TIMING PROTOCOL</p>
        <div className="space-y-2">
          {DIET_PLAN.meals.map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="font-mono text-xs text-neon w-24 flex-shrink-0">{m.time}</span>
              <span className="font-body text-sm text-muted">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
