namespace ForgottenEmpires.Components.OptimizedTasks
{
    public abstract class OptimizedTask
    {
        public int priority, poolSize;

        public OptimizedTask(int priority = -1, int poolSize = 1)
        {
            this.priority = priority;
            this.poolSize = poolSize;
        }
    }
}