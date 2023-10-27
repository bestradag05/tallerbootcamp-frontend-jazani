import { useEffect, type JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumb, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type InvestmentRequest } from '../../domain';
import { Link } from 'react-router-dom';
import useFindByIdInvestment from '../../application/hooks/useFindByIdInvestment';

interface FormSaveProps {
	id?: number;
	pageTitle: string;
	onSave: (payload: InvestmentRequest) => void;
}

const FormSave = ({ id, pageTitle, onSave }: FormSaveProps): JSX.Element => {
	// Attributes

	const formik = useFormik<InvestmentRequest>({
		initialValues: {
			amountInvestd: 0,
			year: 0,
			description: '',
			accountantCode: '',
			documentId: 0,
			holderId: 0,
			declaredTypeId: 0,
			investmentConceptId: 0,
			investmentTypeId: 0,
			currencyTypeId: 0,
			measureUnitId: 0,
			miningConcessionId: 0,
			periodTypeId: 0,
		},
		validationSchema: Yup.object({}),
		onSubmit: values => {
			console.log('values', values);

			onSave(values);
		},
	});

	// React Query
	const { data: investment } = useFindByIdInvestment(id);

	// Hooks
	useEffect(() => {
		if (investment != null)
			void formik.setValues({
				amountInvestd: investment.amountInvestd,
				year: investment.year,
				description: investment.description,
				accountantCode: investment.accountantCode,
				documentId: investment.document.id,
				holderId: investment.holder.id,
				declaredTypeId: investment.declaredTypeId,
				investmentConceptId: investment.investmentConcept.id,
				investmentTypeId: investment.investmentType.id,
				currencyTypeId: investment.currencyTypeId,
				measureUnitId: investment.measureUnit.id,
				miningConcessionId: investment.miningConcession.id,
				periodTypeId: investment.periodType.id,
			});
	}, [investment]);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item>Investment</Breadcrumb.Item>
				<Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-secondary" to="/investments">
						Atras
					</Link>
				</li>
			</Breadcrumb>
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={8} lg={8} xl={6}>
					<Card>
						<Card.Header>Inversiones </Card.Header>
						<Card.Body>
							<Form className="d-grid gap-3" onSubmit={formik.handleSubmit}>
								<Form.Group>
									<Form.Label>Amount Investd</Form.Label>
									<Form.Control
										type="text"
										name="amountInvestd"
										value={formik.values.amountInvestd}
										onChange={formik.handleChange}
									/>
									{(formik.touched.amountInvestd ?? false) &&
										formik.errors.amountInvestd != null && (
											<small className="text-danger">{formik.errors.amountInvestd}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Year</Form.Label>
									<Form.Control
										type="text"
										name="year"
										value={formik.values.year}
										onChange={formik.handleChange}
									/>
									{(formik.touched.year ?? false) && formik.errors.year != null && (
										<small className="text-danger">{formik.errors.year}</small>
									)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="text"
										name="description"
										value={formik.values.description}
										onChange={formik.handleChange}
									/>
									{(formik.touched.description ?? false) && formik.errors.description != null && (
										<small className="text-danger">{formik.errors.description}</small>
									)}
								</Form.Group>

								<Form.Group>
									<Form.Label>AcountantCode</Form.Label>
									<Form.Control
										type="text"
										name="accountantCode"
										value={formik.values.accountantCode}
										onChange={formik.handleChange}
									/>
									{(formik.touched.accountantCode ?? false) &&
										formik.errors.accountantCode != null && (
											<small className="text-danger">{formik.errors.accountantCode}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>DocumentId</Form.Label>
									<Form.Control
										type="text"
										name="documentId"
										value={formik.values.documentId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.documentId ?? false) && formik.errors.documentId != null && (
										<small className="text-danger">{formik.errors.documentId}</small>
									)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Holder Id</Form.Label>
									<Form.Control
										type="text"
										name="holderId"
										value={formik.values.holderId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.holderId ?? false) && formik.errors.holderId != null && (
										<small className="text-danger">{formik.errors.holderId}</small>
									)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Declared Type Id</Form.Label>
									<Form.Control
										type="text"
										name="declaredTypeId"
										value={formik.values.declaredTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.declaredTypeId ?? false) &&
										formik.errors.declaredTypeId != null && (
											<small className="text-danger">{formik.errors.declaredTypeId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Investment Concept Id</Form.Label>
									<Form.Control
										type="text"
										name="investmentConceptId"
										value={formik.values.investmentConceptId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmentConceptId ?? false) &&
										formik.errors.investmentConceptId != null && (
											<small className="text-danger">{formik.errors.investmentConceptId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Investment Type Id</Form.Label>
									<Form.Control
										type="text"
										name="investmentTypeId"
										value={formik.values.investmentTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmentTypeId ?? false) &&
										formik.errors.investmentTypeId != null && (
											<small className="text-danger">{formik.errors.investmentTypeId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Currency Type Id</Form.Label>
									<Form.Control
										type="text"
										name="currencyTypeId"
										value={formik.values.currencyTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.currencyTypeId ?? false) &&
										formik.errors.currencyTypeId != null && (
											<small className="text-danger">{formik.errors.currencyTypeId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Measure UnitId</Form.Label>
									<Form.Control
										type="text"
										name="measureUnitId"
										value={formik.values.measureUnitId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.measureUnitId ?? false) &&
										formik.errors.measureUnitId != null && (
											<small className="text-danger">{formik.errors.measureUnitId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Mining Concession Id</Form.Label>
									<Form.Control
										type="text"
										name="miningConcessionId"
										value={formik.values.miningConcessionId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.miningConcessionId ?? false) &&
										formik.errors.miningConcessionId != null && (
											<small className="text-danger">{formik.errors.miningConcessionId}</small>
										)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Period TypeI d</Form.Label>
									<Form.Control
										type="text"
										name="periodTypeId"
										value={formik.values.periodTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.periodTypeId ?? false) && formik.errors.periodTypeId != null && (
										<small className="text-danger">{formik.errors.periodTypeId}</small>
									)}
								</Form.Group>

								<hr />
								<div className="d-flex justify-content-end">
									<Button type="submit" variant="primary" className="me-2">
										Guardar
									</Button>
									<Button type="button" variant="secondary" onClick={formik.handleReset}>
										Limpiar
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default FormSave;
