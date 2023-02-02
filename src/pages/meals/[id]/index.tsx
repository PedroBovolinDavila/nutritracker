import { GetServerSideProps } from 'next'
import { Navbar } from '../../../components/Navbar'
import { AddFeedback } from '../../../components/meals/AddFeedback'
import { Feedback } from '../../../components/meals/Feedback'
import { parseCookies } from 'nookies'
import { api } from '../../../lib/axios'
import { prisma } from '../../../lib/prisma'
import { Meal as MealType } from '../../patient'
import Image from 'next/image'
import { IngredientCard } from '../../../components/meals/IngredientCard'

interface MealProps {
  role: 'doctor' | 'patient'
  meal: MealType
}

export default function Meal({ role, meal }: MealProps) {
  return (
    <div className="bg-gray-900 w-full p-4 h-screen">
      <Navbar />
      <div className="w-full mt-4 max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex gap-8">
        <Image
          src={`http://localhost:3000/uploads/${meal.image_url}`}
          alt=""
          width={300}
          height={400}
          className="rounded-md"
        />
        <div>
          <div>
            <h2 className="text-xl text-slate-200 font-bold">{meal.title}</h2>

            <p className="text-slate-200">{meal.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient, index) => (
              <IngredientCard key={index} ingredient={ingredient} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Feedback />
        {role === 'doctor' && <AddFeedback />}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { '@nutritracker-auth': token } = parseCookies({ req })

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const { data } = await api.post('http://localhost:3000/api/validate-token', {
    token,
  })

  const mealId = String(query.id)

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  })

  if (!meal) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      role: data.role,
      meal: JSON.parse(JSON.stringify(meal)),
    },
  }
}
