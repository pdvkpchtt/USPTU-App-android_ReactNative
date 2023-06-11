import apiClient from '../../../shared/apiClient/index'

export default async function getHostelInfo() {
  const data = await apiClient.post('', `cat=s`, {
    params: {
      obj: 'GetHOSTEL',
    },
  })
  const hostelData = data.data
  const info = {}
  try {
    info.name = hostelData.split('Общежитие:</td><td>')[1].split('</td>')[0]
    info.address = hostelData.split('Адрес общежития:</td><td>')[1].split('</td>')[0]
    info.status = hostelData.split('Статус заявки (договора):</td><td>')[1].split('</td>')[0]
    info.statusText = hostelData
      .split('ИНФОРМАЦИЯ:</td><td>')[1]
      .split('</td>')[0]
      .replace(/<(.|\n)*?>/g, '')
      .trim()
    info.link = 'https://ams.rusoil.net/pcs' + hostelData.split('Печать договора:</td><td><a href=".')[1].split('"')[0]
  } catch (e) {
    return null
  }

  const billTable = hostelData.split('Операция</td></tr>')[1].split('<tr>')

  const bills = []

  for (let i = 1; i < billTable.length; i++) {
    const billAttributes = billTable[i].split('<td>')
    const bill = []
    for (let i = 1; i < 6; i++) {
      const billAttribute = billAttributes[i].split('</td>')[0].split('&nbsp;')[1]
      bill.push(billAttribute)
    }
    bills.push(bill)
  }

  return { info, bills }
}
