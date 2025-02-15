-- Função para obter resumo mensal
CREATE OR REPLACE FUNCTION get_monthly_summary(
    p_user_id UUID,
    p_start_date TIMESTAMP,
    p_end_date TIMESTAMP
) RETURNS TABLE (
    total_income DECIMAL(10,2),
    total_expense DECIMAL(10,2),
    net_balance DECIMAL(10,2),
    total_transactions INTEGER
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    WITH summary AS (
        SELECT
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expense,
            COUNT(*) as num_transactions
        FROM transactions
        WHERE user_id = p_user_id
        AND date >= p_start_date
        AND date <= p_end_date
    )
    SELECT
        income as total_income,
        expense as total_expense,
        (income - expense) as net_balance,
        num_transactions as total_transactions
    FROM summary;
END;
$$;

-- Função para obter gastos por categoria
CREATE OR REPLACE FUNCTION get_spending_by_category(
    p_user_id UUID,
    p_start_date TIMESTAMP,
    p_end_date TIMESTAMP
) RETURNS TABLE (
    category_id INTEGER,
    category_name VARCHAR(50),
    total_amount DECIMAL(10,2),
    percentage DECIMAL(5,2)
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    WITH category_totals AS (
        SELECT
            c.category_id,
            c.name as category_name,
            COALESCE(SUM(t.amount), 0) as total_amount
        FROM categories c
        LEFT JOIN transactions t ON c.category_id = t.category_id
            AND t.date >= p_start_date
            AND t.date <= p_end_date
            AND t.user_id = p_user_id
            AND t.type = 'expense'
        WHERE c.user_id = p_user_id
        GROUP BY c.category_id, c.name
    ),
    total_spending AS (
        SELECT NULLIF(SUM(total_amount), 0) as total
        FROM category_totals
    )
    SELECT
        ct.category_id,
        ct.category_name,
        ct.total_amount,
        CASE
            WHEN ts.total > 0 THEN
                ROUND((ct.total_amount / ts.total * 100)::numeric, 2)
            ELSE 0
        END as percentage
    FROM category_totals ct
    CROSS JOIN total_spending ts
    WHERE ct.total_amount > 0
    ORDER BY ct.total_amount DESC;
END;
$$;

-- Função para obter fluxo de caixa
CREATE OR REPLACE FUNCTION get_cash_flow(
    p_user_id UUID,
    p_start_date TIMESTAMP,
    p_end_date TIMESTAMP
) RETURNS TABLE (
    date DATE,
    income DECIMAL(10,2),
    expense DECIMAL(10,2),
    balance DECIMAL(10,2)
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE dates AS (
        SELECT p_start_date::date as date
        UNION ALL
        SELECT date + 1
        FROM dates
        WHERE date < p_end_date::date
    ),
    daily_transactions AS (
        SELECT
            d.date,
            COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) as expense
        FROM dates d
        LEFT JOIN transactions t ON d.date = t.date::date AND t.user_id = p_user_id
        GROUP BY d.date
    )
    SELECT
        dt.date,
        dt.income,
        dt.expense,
        SUM(dt.income - dt.expense) OVER (ORDER BY dt.date) as balance
    FROM daily_transactions dt
    ORDER BY dt.date;
END;
$$;
