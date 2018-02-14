import { Component } from 'react'
import Link from 'next/link'

import Pulse from 'grommet/components/icons/Pulse'
import PowerIcon from 'grommet/components/icons/base/Power'
import Box from 'grommet/components/Box'

export default class Logo extends Component {
  render () {
    return (
        <Box pad='medium' size='auto' responsive={true} align='center'>
            <Link href="/">
                <Pulse icon={<PowerIcon />} />
            </Link>
        </Box>
    )
  }
}
