import { GetServerSideProps } from 'next'
import { Navbar } from '../../../components/Navbar'
import { AddFeedback } from '../../../components/meals/AddFeedback'
import { Feedback } from '../../../components/meals/Feedback'
import { MealSection } from '../../../components/meals/MealSection'

interface MealProps {
  id: string
}

export default function Meal({ id }: MealProps) {
  return (
    <div className="bg-gray-900 w-full p-4 h-screen">
      <Navbar />
      <MealSection />
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Feedback />
        <AddFeedback />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      id: query.id,
    },
  }
}
