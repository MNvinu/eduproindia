// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/logo.png';
import { Link } from 'react-router-dom';
import no_ofreferal from '../../assets/img/gallery/no_ofreferal.png';
import course from '../../assets/img/gallery/course.png';
import amountearned from '../../assets/img/gallery/amountearned.webp';
import axios from 'axios';
import './style.css'
import
{
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
	TableSortLabel, Checkbox, Paper, Typography
} from '@mui/material';

function AdminDashboard()
{
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('firstName');

	useEffect(() =>
	{
		const fetchUsers = async () =>
		{
			try
			{
				const response = await axios.get('http://localhost:5000/admin'); // Adjust URL as needed
				setUsers(response.data);
			} catch (error)
			{
				console.error('Error fetching users:', error);
			} finally
			{
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	const handleRequestSort = (property) =>
	{
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedUsers = [...users].sort((a, b) =>
	{
		if (a[orderBy] < b[orderBy])
		{
			return order === 'asc' ? -1 : 1;
		}
		if (a[orderBy] > b[orderBy])
		{
			return order === 'asc' ? 1 : -1;
		}
		return 0;
	});

	const handleSelectAllClick = (event) =>
	{
		if (event.target.checked)
		{
			const newSelecteds = users.map((user) => user.userId);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (userId) =>
	{
		const selectedIndex = selected.indexOf(userId);
		let newSelected = [];

		if (selectedIndex === -1)
		{
			newSelected = newSelected.concat(selected, userId);
		} else if (selectedIndex === 0)
		{
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1)
		{
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0)
		{
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const isSelected = (userId) => selected.indexOf(userId) !== -1;

	if (loading)
	{
		return <p>Loading users...</p>;
	}

	return (
		<>
			<div className="header-area ">
				<div className="main-header">
					<div className="header-bottom header-sticky">
						<div className="container-fluid">
							<div className="row align-items-center">
								{/* Logo */}
								<div className="col-xl-2 col-lg-2">
									<div className="logo">
										<Link to="/">
											<img src={logo} alt="Logo" />
										</Link>
									</div>
								</div>
								<div className="col-xl-10 col-lg-10">
									<div className="menu-wrapper d-flex align-items-center justify-content-end">
										{/* Main-menu */}
										<div className="main-menu d-none d-lg-block">
											<nav>
												<ul id="navigation">
													<li className="active"><Link to="/">Home</Link></li>
													<li><Link to="/register">Courses</Link></li>
													{/* {isLoggedIn ? (
														<li className="button-header">
															<button onClick={handleLogout} className="btn btn3">Logout</button>
														</li>
													) : (
														<>
															<li className="button-header margin-left">
																<Link to="/signup" className="btn">Join</Link>
															</li>
															<li className="button-header">
																<Link to="/login" className="btn btn3">Log in</Link>
															</li>
														</>
													)} */}
												</ul>
											</nav>
										</div>
									</div>
								</div>
								{/* Mobile Menu */}
								<div className="col-12">
									<div className="mobile_menu d-block d-lg-none"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="userheader my-5" style={{ marginTop: "2%" }}>
				<div className="row align-items-center">
					<div className="col-sm mb-2 mb-sm-0">

						<h1 className="page-header-title">Referrals</h1>
					</div>
				</div>
				<hr className="custom-divider" />
				<div className="row mt-4">
					<div className="col-lg-4">
						<div className="text-center">
							<img src={no_ofreferal} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body">Total Number of Users</span>
							<span className="d-block display-4 text-dark mb-2">84</span>

							<div className="row col-divider">
								<div className="col text-end">
									<span className="d-block fw-semibold text-success">
										<i className="bi-graph-up"></i> 5.6%
									</span>
									<span className="d-block">change</span>
								</div>
								<div className="col text-start">
									<span className="d-block fw-semibold text-dark">$582.00</span>
									<span className="d-block">last week</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							{/* <img className="avatar avatar-xl avatar-4x3 mb-4" src="./assets/svg/illustrations/oc-money-profits.svg" alt="Amount earned" style={{ minHeight: '6rem' }} /> */}
							<img src={amountearned} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body">Amount earned</span>
							<span className="d-block display-4 text-dark mb-2">$53.00</span>

							<div className="row col-divider">
								<div className="col text-end">
									<span className="d-block fw-semibold text-success">
										<i className="bi-graph-up"></i> 5.6%
									</span>
									<span className="d-block">change</span>
								</div>
								<div className="col text-start">
									<span className="d-block fw-semibold text-dark">$582.00</span>
									<span className="d-block">last week</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							<img src={course} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body">Referrals completed</span>
							<span className="d-block display-4 text-dark mb-2">25</span>

							<div className="row col-divider">
								<div className="col text-end">
									<span className="d-block fw-semibold text-danger">
										<i className="bi-graph-down"></i> 2.3%
									</span>
									<span className="d-block">change</span>
								</div>
								<div className="col text-start">
									<span className="d-block fw-semibold text-dark">7</span>
									<span className="d-block">last week</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="my-5">
					<p className="text-muted">
						<i className="bi-exclamation-octagon"></i> Last referral: August 25, 2020.
					</p>
				</div>

				{/* <div class="admin-tbl">
			<h1>Registered Users</h1>
			<table className="adm-tbl-dtl">
				<thead >
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Referral Id</th>
						<th>Referral code</th>
						<th>Total No of Refers</th>
						<th>Total Earned</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
							<td>{user.userId}</td>
							<td>{user.referralCode}</td>
							<td>{user.totalReferrals}</td>
							<td>{user.totalEarned}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div> */}
				<Typography variant="h4" gutterBottom>Registered Users</Typography>
				<TableContainer component={Paper}>
					<Table aria-label="sortable and selectable table">
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={selected.length > 0 && selected.length < users.length}
										checked={users.length > 0 && selected.length === users.length}
										onChange={handleSelectAllClick}
										color="primary"
									/>
								</TableCell>
								{['firstName', 'lastName', 'email', 'userId', 'referralCode', 'totalReferrals', 'totalEarned'].map((column) => (
									<TableCell key={column} sortDirection={orderBy === column ? order : false}>
										<TableSortLabel
											active={orderBy === column}
											direction={orderBy === column ? order : 'asc'}
											onClick={() => handleRequestSort(column)}
										>
											{column.charAt(0).toUpperCase() + column.slice(1)}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedUsers.map((user, index) =>
							{
								const isItemSelected = isSelected(user.userId);
								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={user.userId}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isItemSelected}
												onClick={() => handleClick(user.userId)}
												color="primary"
											/>
										</TableCell>
										<TableCell>{user.firstName}</TableCell>
										<TableCell>{user.lastName}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.userId}</TableCell>
										<TableCell>{user.referralCode}</TableCell>
										<TableCell>{user.totalReferrals}</TableCell>
										<TableCell>{user.totalEarned}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
		</>
	);
}

export default AdminDashboard;
