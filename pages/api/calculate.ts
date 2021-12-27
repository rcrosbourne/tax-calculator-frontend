// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { inputType } from '..'

type Data = {

  breakdown: {
    grossMonthlyIncome: string,
    additionalTaxableIncome: string,
    totalEarnings: string,
    nationalInsuranceScheme: string,
    statutoryIncome: string,
    educationTax: string,
    nationalHousingTrust: string,
    incomeTax: string,
    totalDeductions: string,
    netMonthlyIncome: string
    voluntaryDeductions: {
      pensionAmount: string,
      deductions: string
    }

  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let submitData = {} as inputType;
  submitData.pensionValue = req.body.pensionValue ? req.body.pensionValue : "0.00";
  submitData.monthlyGross = req.body.monthlyGross ? req.body.monthlyGross : "0.00";
  submitData.otherIncome = req.body.otherIncome ? req.body.otherIncome : "0.00";
  submitData.otherDeductions = req.body.otherDeductions
    ? req.body.otherDeductions
    : "0.00";
  submitData.otherExpenses = req.body.otherExpenses ? req.body.otherExpenses : "0.00";
  submitData.pensionType = req.body.pensionType ? req.body.pensionType : "PERCENTAGE";

  const response = await fetch(
    `${process.env.TAX_CALCULATOR_ENDPOINT}/api/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submitData),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // let resp = response.json() as Data;
  let dataReturn = await response.json();
  return res.status(200).json(dataReturn);
}
