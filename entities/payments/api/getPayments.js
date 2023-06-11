import CONSTANTS from '../../../config'
import apiClient from '../../../shared/apiClient/index'
import moment from 'moment/moment'
import capitalize from './../../../shared/utils/capitalize'

export default async function getPayments() {
  const data = await apiClient.post('', `cat=s`, {
    params: {
      obj: 'getstip',
    },
  })

  const activePayments = []
  const inActivePayments = []

  for (let payment of data.data) {
    const itemPayment = {}
    itemPayment.type = payment['nvip']
    itemPayment.name = capitalize(payment['nvdoxod'])
    itemPayment.start_date = payment['datanv']
    itemPayment.end_date = payment['datakv']
    itemPayment.amount = payment['summa']
    itemPayment.order_number = payment['nomerprik']
    itemPayment.order_date = payment['dataprik']
    itemPayment.cancel_order_number = payment['prikazotm']
    itemPayment.cancel_order_number_date = payment['dataprikazotm']

    if (moment(itemPayment.end_date, 'DD.MM.YYYY').isAfter(moment())) {
      activePayments.push(itemPayment)
    } else {
      inActivePayments.push(itemPayment)
    }
  }

  return { activePayments, inActivePayments }
}
