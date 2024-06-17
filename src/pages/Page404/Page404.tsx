import { Link } from 'react-router-dom'
import './Page404.css'
import Button from '../../components/Button/Button'


function Page404() {
  return (<>
    <main id='Page404'>
      <p className='text-4xl'>404</p>
      <p className='text-2xl' style={{marginBottom: '4rem'}}>Page not found :(</p>
      <Link to="/"><Button type="button" typeStyle="primary">Back to home</Button></Link>
    </main>
  </>)
}

export default Page404